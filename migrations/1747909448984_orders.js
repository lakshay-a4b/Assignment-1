/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("orders", {
    orderId: { type: "serial", primaryKey: true },
    paymentId: { 
      type: "varchar(100)", 
      unique: true,
      references: 'payment("paymentId")',
      onDelete: "CASCADE",
    },
    userId: {
      type: "varchar(100)",
      notNull: true,
      references: 'users("userId")',
      onDelete: "CASCADE",
    },
    productInfo: { type: "jsonb[]", notNull: true },
    
    status: { type: "varchar(20)", default: "in-transit" },
    createdAt: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
  pgm.createIndex("orders", ["userId"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("orders");
};
