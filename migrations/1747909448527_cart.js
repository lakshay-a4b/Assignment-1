/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
  // Create the cart table without the primary key first
  pgm.createTable("cart", {
    cartId: { type: "serial", primaryKey: true },
    userId: {
      type: "varchar(100)",
      unique: true,
      notNull: true,
      references: 'users("userId")',
      onDelete: "CASCADE",
    },
    productInfo: {
      type: "jsonb[]",
      notNull: true,
    },
    updatedAt: { type: "timestamp", default: pgm.func("current_timestamp") },
  });

  pgm.createIndex("cart", ["userId"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
export const down = (pgm) => {
  pgm.dropTable("cart");
};
