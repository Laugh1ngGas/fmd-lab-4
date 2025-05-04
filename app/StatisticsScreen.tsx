import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from './index';

type StatisticsRouteProp = RouteProp<RootStackParamList, 'Statistics'>;

const StatisticsScreen = () => {
  const route = useRoute<StatisticsRouteProp>();
  const { totalIncome, totalExpenses, balance } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <Text>Total Income: {totalIncome} $</Text>
      <Text>Total Expenses: {totalExpenses} $</Text>
      <Text>Balance: {balance} $</Text>
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
    marginBottom: 20,
  },
});

export default StatisticsScreen;
