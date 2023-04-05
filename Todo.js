import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';

export default function Todo() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function addTodo() {
    if (input.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: input.trim(),
          bgColor: randomColor(),
        },
      ]);
      setInput('');
    }
  }

  function deleteTodo(id) {
    Alert.alert('Delete Todo', 'Bu todoyu silmek istediğinizden eminmisiniz?', [
      { text: 'İptal', style: 'iptal_style' },
      {
        text: 'OK',
        onPress: () => setTodos(todos.filter((todo) => todo.id !== id)),
      },
    ]);
  }
  function cleanTodo() {
    Alert.alert('Reset List', 'Listeyi temizlemek istediğinizden emin misiniz?', [
      { text: 'Hayır'},
      {
        text: 'Evet', onPress:()=>setTodos([])}
    ]);
  
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder=" Yapılacak Gir"
        value={input}
        onChangeText={setInput}
      />
<View style={styles.buttons}>
      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.addButtonText}>EKLE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={cleanTodo}>
        <Text style={styles.clearButtonText}>TEMİZLE</Text>
      </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.todo, { backgroundColor: item.bgColor }]}>
            <Text style={styles.todoText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteButton}> X </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    height: 40,
    marginBottom: 20,
  
  },
  addButton: {
    fontSize: 15,
    color: 'white',
    backgroundColor:'red',
    width: 70,
    height:30,
    borderRadius:10,
  },
    addButtonText:{
     color:'white',
     paddingTop:5,
     paddingLeft: 18,
    

   },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingBottom: 10,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 8, 

  },
  todoText: {
    fontSize: 15,
    padding: 5,
    marginLeft:5,
  },
  deleteButton: {
    fontSize: 15,
    color: 'red',
    marginRight:7,
  },
  clearButton:{
    fontSize: 15,
    color: 'white',
    backgroundColor:'blue',
    width: 70,
    height:30,
    borderRadius:10,
    
  },
   clearButtonText:{
     color:'white',
     padding:5,
      paddingLeft: 7,
    

   },
  buttons:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft:100,
    marginRight: 100,
    
  }
});
