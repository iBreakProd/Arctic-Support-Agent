import { db } from "@repo/db";
import { eq } from "drizzle-orm";
import {
  ordersTable,
  orderItemsTable,
  productsTable,
} from "@repo/db/schema";

function extractShortId(input: string): string | null {
  const cleaned = input.replace(/^#?ORD-?/i, "").replace(/\s/g, "").toUpperCase();
  const match = cleaned.match(/[0-9A-F]{8}$/) ?? (cleaned.length === 8 && /^[0-9A-F]+$/.test(cleaned) ? [cleaned] : null);
  return match ? match[0] : null;
}

function isFullUuid(input: string): boolean {
  const cleaned = input.replace(/\s/g, "");
  return cleaned.length >= 36 && cleaned.includes("-");
}

async function resolveOrderId(orderIdInput: string): Promise<string | null> {
  const trimmed = orderIdInput.trim();
  if (isFullUuid(trimmed)) {
    const [row] = await db
      .select({ id: ordersTable.id })
      .from(ordersTable)
      .where(eq(ordersTable.id, trimmed))
      .limit(1);
    return row?.id ?? null;
  }
  const shortId = extractShortId(trimmed);
  if (shortId) {
    const orders = await db.select({ id: ordersTable.id }).from(ordersTable);
    const found = orders.find(
      (o: { id: string }) => o.id.replace(/-/g, "").slice(-8).toUpperCase() === shortId
    );
    return found?.id ?? null;
  }
  return null;
}

export const getOrderById = async (orderId: string) => {
  const order = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.id, orderId));
  return order;
};

export const getOrderByIdWithItems = async (orderIdInput: string) => {
  const orderId = await resolveOrderId(orderIdInput);
  if (!orderId) return null;

  const [orderRow] = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.id, orderId))
    .limit(1);
  if (!orderRow) return null;

  const itemsRows = await db
    .select({
      productId: orderItemsTable.productId,
      quantity: orderItemsTable.quantity,
      unitPrice: orderItemsTable.unitPrice,
      lineTotal: orderItemsTable.lineTotal,
      product: {
        id: productsTable.id,
        name: productsTable.name,
        imageUrl: productsTable.imageUrl,
      },
    })
    .from(orderItemsTable)
    .innerJoin(productsTable, eq(orderItemsTable.productId, productsTable.id))
    .where(eq(orderItemsTable.orderId, orderId));

  const items = itemsRows.map((row: (typeof itemsRows)[number]) => ({
    productId: row.productId,
    quantity: row.quantity,
    unitPrice: row.unitPrice,
    lineTotal: row.lineTotal,
    product: row.product,
  }));

  return { order: orderRow, items };
};

export const listAllOrders = async () => {
  const orders = await db.select().from(ordersTable);
  return orders;
};
