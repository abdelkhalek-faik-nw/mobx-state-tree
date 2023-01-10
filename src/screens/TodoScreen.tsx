import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Dropdown, DropdownItem} from '../components/Dropdown';
import {TaskType} from '../store/Task';
import {arrayFilters, useTasksStore} from '../store/TasksStore';
import {observer} from 'mobx-react-lite';

const trashIcon = require('../assets/trash.png');
const dropdownItems: DropdownItem[] = arrayFilters.map(filter => ({
  label: filter,
  value: filter,
}));
const todoItem = task => {
  return (
    <View
      style={{
        padding: 20,
        marginBottom: 10,
        borderRadius: 7,
        backgroundColor: task.item.isCompleted
          ? '#rgba(225, 255, 176, 0.3)'
          : 'rgba(246, 237, 255,1)',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text>{task.item.task}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable onPress={task.item.delete}>
          <Image style={{height: 20, width: 20}} source={trashIcon} />
        </Pressable>
        <CheckBox
          value={task.item.isCompleted}
          onValueChange={task.item.markAsCompleted}
        />
      </View>
    </View>
  );
};

export const TodoScreen = observer(() => {
  const [taskText, setTaskText] = useState('');
  const tasksStore = useTasksStore();
  const {
    filteredTasks: tasks,
    addTask,
    pendingTasksCount,
    resetTasks,
    completedTasksCount,
    setFilter,
    filter,
  } = tasksStore;

  const addTaskHahndler = () => {
    if (taskText) {
      const task: TaskType = {
        id: Math.random().toString(),
        task: taskText,
        isCompleted: false,
        creationDate: new Date(),
      };
      addTask(task);
      setTaskText('');
    }
  };

  return (
    <View style={{paddingHorizontal: 10, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            lineHeight: 70,
            color: 'black',
          }}>
          Todo App
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'green',
            lineHeight: 70,
          }}>
          {completedTasksCount} Done
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <TextInput
          placeholder="New todo"
          onChangeText={setTaskText}
          value={taskText}
          style={{flex: 1, borderWidth: 0.5, borderRadius: 5, marginRight: 5}}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#A34CFF',
            paddingHorizontal: 20,
            borderRadius: 5,
          }}
          onPress={addTaskHahndler}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 30,
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <Dropdown
        items={dropdownItems}
        onChange={filter => setFilter(filter.value)}
        value={filter}
      />
      <FlatList
        keyExtractor={item => item.id}
        data={tasks}
        renderItem={todoItem}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          position: 'absolute',
          bottom: 30,
          width: '100%',
        }}>
        <Text>You have {pendingTasksCount} pending tasks</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#A34CFF',
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
          onPress={resetTasks}>
          <Text style={{color: 'white'}}>Clear ALL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
