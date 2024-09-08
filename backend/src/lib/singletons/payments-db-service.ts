// payments.ts
import Database from 'better-sqlite3';
import { Payment } from '../../models/Payment';

class PaymentsDbService {
	private static instance: PaymentsDbService;
	private db: Database.Database;

	private constructor() {
		this.db = new Database('payments.db', { verbose: console.log });
		this.createTable();
	}

	public static getInstance(): PaymentsDbService {
		if (!PaymentsDbService.instance) {
			PaymentsDbService.instance = new PaymentsDbService();
		}
		return PaymentsDbService.instance;
	}

	// Create our Payments Table
	private createTable() {
		this.db
			.prepare(
				`
      CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL,
        code TEXT,
        payment TEXT,
        grid TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
			)
			.run();
	}

	// Create a new payment
	createPayment(_payment: Payment) {
		const { amount, code, grid, payment } = _payment;
		const gridJson = JSON.stringify(grid);
		const stmt = this.db.prepare(`
      INSERT INTO payments (amount, code, grid, payment)
      VALUES (?, ?, ?, ?)
    `);

		try {
			const result = stmt.run(amount, code, gridJson, payment);
		} catch (err) {}
	}

	getAllPayments() {
		try {
			const stmt = this.db.prepare('SELECT * FROM payments');
			const payments = stmt.all().map((payment: any) => ({
				...payment,
				grid: JSON.parse(payment.grid),
			}));
			return payments;
		} catch (err) {}
	}
}

export default PaymentsDbService;
