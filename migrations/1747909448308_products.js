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
  pgm.createTable("products", {
    productId: { type: "serial", primaryKey: true },
    name: { type: "varchar(100)", notNull: true },
    description: { type: "text" },
    image: { type: "varchar(255)" },
    price: { type: "numeric(10, 2)", notNull: true },
    createdAt: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("products");
};
