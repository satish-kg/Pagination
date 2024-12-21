/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {MaterialCommunityIcons} from 'react-native-vector-icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const MAX_PAGE_BUTTONS = 5; // Maximum number of page buttons to display

  // Generate an array of page numbers to display based on the current page
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
    let endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);

    if (endPage - startPage + 1 < MAX_PAGE_BUTTONS) {
      startPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <View style={styles.container}>
      {/* Previous Page Button (Paper Button with Icon) */}
      <Button
        mode="contained"
        style={[styles.button, currentPage === 1 && styles.disabledButton]}
        onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        icon="chevron-left">
        Previous
      </Button>

      {/* Page Number Buttons (TouchableOpacity) */}
      {getPageNumbers().map(page => (
        <TouchableOpacity
          key={page}
          style={[
            styles.pageButton,
            page === currentPage && styles.activePageButton,
          ]}
          onPress={() => onPageChange(page)}>
          <Text
            style={[
              styles.pageButtonText,
              page === currentPage && styles.activePageText,
            ]}>
            {page}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Next Page Button (Paper Button with Icon) */}
      <Button
        mode="contained"
        contentStyle={{flexDirection: 'row-reverse'}}
        style={[
          styles.button,
          currentPage === totalPages && styles.disabledButton,
        ]}
        onPress={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        icon="chevron-right">
        Next
      </Button>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    marginHorizontal: 5,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#c0c0c0',
  },
  pageButton: {
    padding: 10,
    marginHorizontal: 2,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: '#007AFF',
  },
  pageButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  activePageText: {
    color: 'white',
  },
});
