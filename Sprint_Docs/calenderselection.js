// @expo/snack imports
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';

const App = () => {
  const [date, setDate] = useState(null); //date setdate usestate

  const formatDate = (date) => { //format date
    if (!date) {
      return 'No Appointments'; //if no date selected
    }

    const options = {//formatting
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    return date.toLocaleString('en-US', options);//formatting
  };

  const onChange = (selectedDate) => { //set date
    setDate(selectedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.datePickerContainer}> 
          <Text style={styles.calendarText}>Appointment Selection</Text>
          <DatePicker
            date={date}
            mode='datetime'
            format='YYYY-MM-DD:HH:mm'
            minDate={new Date()}
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: "35%", // Adjust the left position here
                top: 4, // Adjust the top position here
              },
              dateInput: {
                borderWidth: 0,//adjust borderwidth here
                paddingLeft: 25, // Adjust the left padding here
              },
              dateText: {
                color: 'transparent', // Make the text transparent
              },
              placeholderText: {
                fontSize: 18,//font
                color: 'gray',//color
              },
            }}
            onDateChange={onChange}
          />
        </View>
        <Text style={styles.placeholderText}>{date ? formatDate(date) : 'No Appointments'}</Text>
      </View>
      
    </SafeAreaView>
  );
  //formatting, text inside and outside container
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'forestgreen',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  datePickerContainer: {
    backgroundColor: 'lightgreen',
    borderRadius: 15,
    padding: 13,
    alignItems: 'center',
    width: '75%',
    marginBottom: 20,
  },
  calendarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 18,
    color: 'black',
  },
});

export default App;
