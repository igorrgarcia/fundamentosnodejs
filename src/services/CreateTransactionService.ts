import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    if (type === 'income' || type === 'outcome') {
      const total = type === 'outcome'? this.transactionsRepository.getBalance().total - value : 1
      
      if(total >= 0) {
        const transaction = {
          id: uuid(),
          title,
          value,
          type,
        }
        this.transactionsRepository.create(transaction)
        return transaction
      }else{
        throw Error('You do not have enought balance for this transaction.')
      }

    }else{
      throw Error('Transaction type not acceptable.')
    }

    

  }
}

export default CreateTransactionService;
