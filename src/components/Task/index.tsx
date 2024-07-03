import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {LineNumber, TaskType} from '../../../types/taskType';
import CheckBox from 'react-native-check-box';

interface Props extends TaskType {
  onTaskComplete: (taskId: number) => void;
}

const Task: React.FC<Props> = ({id, title, status, onTaskComplete}) => {
  const [noOfLines, setNoOfLines] = useState<LineNumber>(2);

  // Toggle the number of lines to show for the task title
  const handleReadMore = () => {
    setNoOfLines(noOfLines === undefined ? 2 : undefined);
  };

  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskRow}>
        <CheckBox
          style={styles.checkBox}
          onClick={() => onTaskComplete(id)}
          isChecked={status === 'completed'}
        />
        <Text
          numberOfLines={noOfLines}
          style={[
            styles.taskText,
            status === 'completed' && styles.completedTaskText,
          ]}>
          {title}
        </Text>
      </View>

      {title.length > 72 && (
        <View style={styles.readMoreContainer}>
          <TouchableOpacity
            onPress={handleReadMore}
            style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>
              {noOfLines === undefined ? 'Read less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: '#fff',
    elevation: 3,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    margin: 5,
  },
  taskRow: {
    flexDirection: 'row',
    gap: 10,
  },
  checkBox: {
    height: 0,
    marginTop: 15,
  },
  taskText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    maxWidth: '90%',
  },
  completedTaskText: {
    color: 'rgba(0,0,0,0.3)',
    textDecorationLine: 'line-through',
  },
  readMoreContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 12,
  },
  readMoreButton: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  readMoreText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});
