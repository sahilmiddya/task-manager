import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TaskType} from './types/taskType';
import Task from './src/components/Task';
import {Dropdown} from 'react-native-element-dropdown';
import ListEmptyComponent from './src/components/ListEmptyComponent';

const TASK_FILTER_DATA = [
  {label: 'All', value: ''},
  {label: 'Completed', value: 'completed'},
  {label: 'Pending', value: 'pending'},
];

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  const [tasks, setTasks] = useState<TaskType[]>([
    {id: 1, title: 'Task 1', status: 'pending'},
    {id: 2, title: 'Task 2', status: 'pending'},
  ]);
  const [inputText, setInputText] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
  const [filterValue, setFilterValue] = useState({label: 'All', value: ''});

  // Handle adding a new task
  const handleAddTask = () => {
    if (!inputText) {
      ToastAndroid.showWithGravity(
        'Please put something in your task input.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    setTasks(prevTasks => [
      ...prevTasks,
      {id: prevTasks.length + 1, title: inputText, status: 'pending'},
    ]);

    setInputText('');
  };

  // Handle marking a task as completed
  const handleTaskComplete = (id: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.status = 'completed';
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  // Handle filtering tasks based on status
  const handleFilterTask = (filter: {label: string; value: string}) => {
    setFilterValue({label: filter.label, value: filter.value});
  };

  const renderItem: ListRenderItem<TaskType> = ({item}) => {
    return (
      <Task
        id={item.id}
        title={item.title}
        status={item.status}
        onTaskComplete={handleTaskComplete}
      />
    );
  };

  // Update filtered tasks whenever the filter or tasks change
  useEffect(() => {
    if (filterValue.value === 'completed') {
      setFilteredTasks(tasks.filter(t => t.status === 'completed'));
    } else if (filterValue.value === 'pending') {
      setFilteredTasks(tasks.filter(t => t.status === 'pending'));
    } else {
      setFilteredTasks(tasks);
    }
  }, [filterValue.value, tasks]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text style={styles.headerText}>Create Your Task</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Your Task..."
            value={inputText}
            onChangeText={text => setInputText(text)}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <Text style={styles.taskHeaderText}>Your Tasks</Text>
          <Dropdown
            style={styles.dropdown}
            data={TASK_FILTER_DATA}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={filterValue}
            onChange={handleFilterTask}
          />
        </View>

        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          style={styles.taskList}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  headerText: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
  },
  inputContainer: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 3,
    elevation: 2,
    minHeight: 48,
    fontSize: 18,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 8,
    flex: 3,
  },
  addButton: {
    height: 48,
    backgroundColor: '#333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  taskHeaderText: {
    color: '#333',
    fontSize: 20,
    marginTop: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 150,
    marginTop: 30,
  },
  taskList: {
    marginTop: 15,
  },
});

export default App;
