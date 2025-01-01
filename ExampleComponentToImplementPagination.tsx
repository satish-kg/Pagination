#EXAMPLE COMPONENTS

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import ListItem from './ListItem';
import axios from 'axios';
import styles from '../../shared/customerStyle';
import Pagination from './Pagination';
//const {width, height} = Dimensions.get('window');
const ITEMS_PER_PAGE = 5;

const SearchHistory: React.FC = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        customer_id: localStorage.getItem('customerId'),
      };
      console.log('payload for search history : ', payload);
      try {
        const response = await axios.post(
          '/customer/getSearchhistory',
          payload,
          {
            headers: {'Content-Type': 'application/json'},
          },
        );
        if (response?.data?.status === 'success') {
          await setData(response.data.data.details);
          setTotalItems(response.data.data.details.length);
          console.log('Fetched Data:');
        }
      } catch (error) {
        console.log('Failed to fetch search history:', error);
        console.error('Error fetching search history:', error);
      }
    };

    fetchData();
  }, []);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <NativeHeader /> */}
      <div style={styles.headerContainer}>
        <div style={styles.text}>
          <Text style={styles.header}>Search History</Text>
        </div>
      </div>
      <View style={styles.container}>
        <Text style={styles.total}>Total Searches: {data.length}</Text>
        {data.length > 0 ? (
          <View>
            <FlatList
              data={getPaginatedData()}
              renderItem={({item}) => (
                <ListItem
                  title={`${item.title} `}
                  description={`${item.description}`}
                  price={0}
                  time={Date.now()}
                  path=""
                  removePresent={false}
                  onRemove={() => {}}
                />
              )}
              keyExtractor={item => item.user_id}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={page => setCurrentPage(page)}
            />
          </View>
        ) : (
          <Text style={styles.emptyMessage}>No searches found.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

/*
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
});
*/
export default SearchHistory;
