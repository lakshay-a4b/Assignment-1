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
  pgm.createTable("payment", {
    paymentId: { type: "varchar(100)", primaryKey: true },
    userId: {
      type: "varchar(100)",
      notNull: true,
      references: 'users("userId")',
      onDelete: "CASCADE",
    },
    amount: { type: "numeric(10, 2)", notNull: true },
    status: { type: "varchar(20)", default: "success" },
    createdAt: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
    pgm.createIndex("payment", ["userId"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("payment");
};
