import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const PickupScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [roundTrip, setRoundTrip] = useState(false);
  const [schedule, setSchedule] = useState(Array(7).fill({ Earliest: null, Other: null, Return: null, 'Return Dropoff': null }));
  const [selectedDay, setSelectedDay] = useState(null);

  const showDatePickerFor = (buttonType) => {
    setSelectedButton(buttonType);
    setShowDatePicker(true);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      if (selectedButton === 'start') {
        setStartDate(date);
      } else if (selectedButton === 'end') {
        setEndDate(date);
      }
    }
  };
  

  const renderDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    return daysOfWeek.map((day, index) => (
      <TouchableOpacity key={index} onPress={() => handleDayPress(index)} activeOpacity={0.8}>
        <View style={[styles.dayCard, selectedDay === index && styles.selectedDay]}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellText, { fontSize: 12 }]}>{day}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.earliestPickupButton}
                onPress={() => showTimePicker(index, 'Earliest')}
              >
                <Text style={[styles.buttonText, { fontSize: 10 }]}>Pickup</Text>
                <Text style={[styles.selectedTimeText, { fontSize: 8 }]}>
                  {schedule[index]['Earliest'] ? schedule[index]['Earliest'].toTimeString().split(' ')[0] : ''}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.setTimeButton}
                onPress={() => showTimePicker(index, 'Other')}
              >
                <Text style={[styles.buttonText, { fontSize: 10 }]}>Dropoff</Text>
                <Text style={[styles.selectedTimeText, { fontSize: 8 }]}>
                  {schedule[index]['Other'] ? schedule[index]['Other'].toTimeString().split(' ')[0] : ''}
                </Text>
              </TouchableOpacity>
              {roundTrip && (
                <>
                  <TouchableOpacity
                    style={styles.returnPickupButton}
                    onPress={() => showTimePicker(index, 'Return')}
                  >
                    <Text style={[styles.buttonText, { fontSize: 10 }]}>Ret Pickup</Text>
                    <Text style={[styles.selectedTimeText, { fontSize: 8 }]}>
                      {schedule[index]['Return'] ? schedule[index]['Return'].toTimeString().split(' ')[0] : ''}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.returnDropoffButton}
                    onPress={() => showTimePicker(index, 'Return Dropoff')}
                  >
                    <Text style={[styles.buttonText, { fontSize: 10 }]}>Ret Dropoff</Text>
                    <Text style={[styles.selectedTimeText, { fontSize: 8 }]}>
                      {schedule[index]['Return Dropoff'] ? schedule[index]['Return Dropoff'].toTimeString().split(' ')[0] : ''}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  const handleDayPress = (index) => {
    setSelectedDay(index);
  };

  const showTimePicker = (index, type) => {
    setSelectedDay(index);
    setSelectedButton(type);
    setShowDatePicker(true);
  };

  const handleSetTime = (event, time) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (time) {
      const updatedSchedule = [...schedule];
      updatedSchedule[selectedDay] = { ...updatedSchedule[selectedDay] };
      updatedSchedule[selectedDay][selectedButton] = new Date(time);
      setSchedule(updatedSchedule);
    } else {
      // Clear the selected time if the user cancels
      const updatedSchedule = [...schedule];
      updatedSchedule[selectedDay] = { ...updatedSchedule[selectedDay] };
      updatedSchedule[selectedDay][selectedButton] = null;
      setSchedule(updatedSchedule);
    }
    setSelectedButton(null); // Reset selectedButton state after setting/canceling time
  };

  const handleSetSchedule = () => {
    // Handle setting the schedule
    console.log('Schedule set:', schedule);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>When do you want to be picked up?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Text style={styles.smallText}>Start Date</Text>
          <TouchableOpacity
            style={[styles.button, { marginBottom: 10, backgroundColor: '#4682b4', marginRight: 20 , marginLeft :-10, paddingHorizontal:-20 , paddingLeft:5}]}
            onPress={() => showDatePickerFor('start')}
          >
            <Text style={styles.buttonText}>{startDate ? startDate.toDateString() : 'Start Date'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <Text style={styles.smallText}>End Date</Text>
          <TouchableOpacity
            style={[styles.button, { marginBottom: 10 , backgroundColor: '#4682b4' , paddingHorizontal: 5 ,  marginRight :-10 ,marginLeft: 20 , paddingRight: 5}]}
            onPress={() => showDatePickerFor('end')}
          >
            <Text style={styles.buttonText}>{endDate ? endDate.toDateString() : 'End Date'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.roundTripContainer}>
        <Text style={styles.smallText}>Round Trip</Text>
        <TouchableOpacity style={styles.checkBox} onPress={() => setRoundTrip(!roundTrip)}>
          <Ionicons name={roundTrip ? 'checkmark' : 'square-outline'} size={24} color="#007bff" />
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={selectedButton === 'start' ? startDate || new Date() : endDate || new Date()}
          mode="datetime" // Change mode to 'datetime' to allow selecting both date and time
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
      <View style={styles.scheduleContainer}>
        <Text style={styles.smallText}>Schedule</Text>
        <View style={styles.scheduleHeader}></View>
        {renderDays()}
      </View>
      <TouchableOpacity style={[styles.setScheduleButton , {backgroundColor: '#4682b4' , paddingLeft :50 , paddingRight : 50 }]} onPress={handleSetSchedule}>
        <Text style={styles.setScheduleButtonText}>Set Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  card: {
    width: '80%',
    padding: 20,
    marginTop:10,
    borderRadius: 10,
    backgroundColor: '#87ceeb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  smallText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  roundTripContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  checkBox: {
    marginLeft: 10,
  },
  scheduleContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  scheduleHeader: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayCard: {
    backgroundColor: '#87ceeb',
    borderRadius: 25,
    padding: 1,
    paddingLeft: 40,
    paddingRight: 40,
    marginLeft: 2,
    width: '80%',
  },
  selectedDay: {
    backgroundColor: '#87ceeb',
  },
  tableCellText: {
    textAlign: 'center',
  },
  earliestPickupButton: {
    backgroundColor: '#4682b4',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  setTimeButton: {
    backgroundColor: '#4682b4',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  returnPickupButton: {
    backgroundColor: '#4682b4',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  returnDropoffButton: {
    backgroundColor: '#4682b4',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTimeText: {
    color: '#fff',
    fontSize: 8,
  },
  setScheduleButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  setScheduleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PickupScreen;
