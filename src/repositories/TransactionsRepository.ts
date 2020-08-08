import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4'
 
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Transaction2{
  title: string;
  value: number;
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acc, cur) => {
      if(cur.type === 'income'){
          return acc + cur.value
      }else{
          return acc
      }
    }, 0)
    
    const outcome = this.transactions.reduce((acc, cur) => {
        if(cur.type === 'outcome'){
            return acc + cur.value
        }else{
            return acc
        }
    }, 0)
    
    const balance = {
        income,
        outcome,
        total: income - outcome
    }
    return balance
  }

  public create(transaction: Transaction) {
    this.transactions.push(transaction)
  }
}

export default TransactionsRepository;
