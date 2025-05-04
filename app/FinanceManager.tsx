import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Switch,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './index';

type Operation = {
  id: string;
  amount: number;
  category: string;
  type: 'Income' | 'Expense';
};

const FinanceManager: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Salary');
  const [isIncome, setIsIncome] = useState<boolean>(true);
  const [operations, setOperations] = useState<Operation[]>([]);

  const handleAddOperation = () => {
    if (!amount) return;

    const newOperation: Operation = {
      id: Math.random().toString(),
      amount: parseFloat(amount),
      category,
      type: isIncome ? 'Income' : 'Expense',
    };

    setOperations((prevOps) => [...prevOps, newOperation]);
    setAmount('');
  };

  const handleDeleteOperation = (id: string) => {
    setOperations((ops) => ops.filter((op) => op.id !== id));
  };

  const totalIncome = operations
    .filter((op) => op.type === 'Income')
    .reduce((sum, op) => sum + op.amount, 0);

  const totalExpenses = operations
    .filter((op) => op.type === 'Expense')
    .reduce((sum, op) => sum + op.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finance Manager</Text>

      <View style={styles.inputSection}>
        <Text>Summa</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text>Category</Text>
        <View style={styles.pickerContainer}>
        <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
        >
            <Picker.Item label="Salary" value="Salary" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Transport" value="Transport" />
        </Picker>
        </View>

      <View style={styles.toggleContainer}>
        <Button
          title="Income"
          color={isIncome ? 'green' : 'grey'}
          onPress={() => setIsIncome(true)}
        />
        <Button
          title="Expense"
          color={!isIncome ? 'red' : 'grey'}
          onPress={() => setIsIncome(false)}
        />
      </View>

        <Button title="Add Operation" onPress={handleAddOperation} />
      </View>

      <View style={styles.listSection}>
        <Text>Operations</Text>
        <FlatList<Operation>
          data={operations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.operationItem}>
              <Text
                style={[
                  styles.operationText,
                  { color: item.type === 'Income' ? 'green' : 'red' },
                ]}
                onLongPress={() => handleDeleteOperation(item.id)}
              >
                {item.type === 'Income'
                  ? `+${item.amount} $`
                  : `-${item.amount} $`} ({item.category})
              </Text>
            </View>
          )}
        />
      </View>

      <View style={styles.statsSection}>
        <Text>Income: {totalIncome} $</Text>
        <Text>Expense: {totalExpenses} $</Text>
        <Text>Balance: {balance} $</Text>
      </View>

      <View style={styles.statisticsButton}>
        <Button
          title="Statistics"
          onPress={() =>
            navigation.navigate('Statistics', {
              totalIncome,
              totalExpenses,
              balance,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listSection: {
    marginBottom: 20,
  },
  operationItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
  operationText: {
    fontSize: 16,
  },
  statsSection: {
    marginTop: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  statisticsButton: {
    marginTop: 10,
  },
});

export default FinanceManager;
