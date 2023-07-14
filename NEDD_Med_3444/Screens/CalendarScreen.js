import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Get the current date
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];

  const renderDay = (day) => {
    return (
      <View style={styles.dayContainer}>
        <Text style={day.dateString === currentDateString ? styles.currentDayText : styles.dayText}>
          {day.day}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Calendar Screen</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#00853E' },
        }}
        renderDay={renderDay}
        theme={{
          arrowColor: '#00853E',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dayText: {
    color: '#000000',
    fontSize: 16,
  },
  currentDayText: {
    color: '#00853E',
    fontSize: 16,
  },
});

export default CalendarScreen;
