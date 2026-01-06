import {
  getOrderByIdWithItems,
  listAllOrders,
} from "../../services/db/orderServices";
import {
  getProductById,
  getProductCatalogSummary,
  listAllProducts,
  searchProducts,
} from "../../services/db/productServices";
import {
  fetchAppPurpose,
  fetchBotDocumentation,
  fetchCompanyInformation,
  fetchShippingPolicy,
  fetchReturnsAndRefundsPolicy,
} from "../../services/knowledge/fetchServices";
import { AppError } from "../../utils/errorClasses";
import { getUserProfileByUserId } from "../../services/db/userProfileServices";
import { upsertUserProfileByUserId } from "../../services/db/userProfileServices";

const TOOL_LOG = "[AI:Tool]";

export const toolRunner = async (
  toolName: string,
  toolArgs: Record<string, any>,
  context?: { userId?: string }
) => {
  console.log(`${TOOL_LOG} invoked`, { toolName, toolArgs, contextUserId: context?.userId });
  let userId: string | undefined;
  let result: string;
  try {
  switch (toolName) {
    case "getOrderById": {
      const orderId = toolArgs.orderId ?? "";
      const orderWithItems = await getOrderByIdWithItems(orderId);
      result = orderWithItems ? JSON.stringify(orderWithItems) : JSON.stringify({ error: "Order not found. Try the full order ID or short format like #ORD-22C56AE4" });
      console.log(`${TOOL_LOG} getOrderById`, { orderId, found: !!orderWithItems });
      return result;
    }
    case "getProductById": {
      result = await getProductById(toolArgs.productId);
      console.log(`${TOOL_LOG} getProductById`, { productId: toolArgs.productId });
      return result;
    }
    case "listAllOrders": {
      result = await listAllOrders();
      console.log(`${TOOL_LOG} listAllOrders`);
      return result;
    }
    case "listAllProducts": {
      result = await listAllProducts();
      console.log(`${TOOL_LOG} listAllProducts`);
      return result;
    }
    case "getProductCatalog": {
      const catalog = await getProductCatalogSummary();
      result = JSON.stringify(catalog);
      console.log(`${TOOL_LOG} getProductCatalog`, { categories: catalog.categories.length });
      return result;
    }
    case "searchProducts": {
      result = await searchProducts({
        category: toolArgs.category,
        subCategory: toolArgs.subCategory,
        maxPrice: toolArgs.maxPrice,
        minPrice: toolArgs.minPrice,
        limit: toolArgs.limit,
      });
      console.log(`${TOOL_LOG} searchProducts`, { category: toolArgs.category, subCategory: toolArgs.subCategory, maxPrice: toolArgs.maxPrice });
      return result;
    }
    case "getAppPurpose": {
      result = await fetchAppPurpose();
      console.log(`${TOOL_LOG} getAppPurpose`);
      return result;
    }
    case "getBotDocumentation": {
      result = await fetchBotDocumentation();
      console.log(`${TOOL_LOG} getBotDocumentation`);
      return result;
    }
    case "getCompanyInformation": {
      result = await fetchCompanyInformation();
      console.log(`${TOOL_LOG} getCompanyInformation`);
      return result;
    }
    case "getShippingPolicy": {
      result = await fetchShippingPolicy();
      console.log(`${TOOL_LOG} getShippingPolicy`);
      return result;
    }
    case "getReturnsAndRefundsPolicy": {
      result = await fetchReturnsAndRefundsPolicy();
      console.log(`${TOOL_LOG} getReturnsAndRefundsPolicy`);
      return result;
    }
    case "getUserProfile": {
      userId = toolArgs.userId ?? context?.userId;
      if (!userId) {
        console.log(`${TOOL_LOG} getUserProfile`, { reason: "no_user_id" });
        return JSON.stringify({
          profile: null,
          reason: "no_user_id",
          message: "User ID was not provided. The user may need to log in or refresh the page.",
        });
      }
      const profile = await getUserProfileByUserId(userId);
      if (!profile) {
        console.log(`${TOOL_LOG} getUserProfile`, { userId, reason: "profile_not_set_up" });
        return JSON.stringify({
          profile: null,
          reason: "profile_not_set_up",
          message: "User is logged in but has not set up their hydration profile yet. They should visit the Profile page to add their activity level, climate, and goals. You can still give general product recommendations using searchProducts.",
        });
      }
      console.log(`${TOOL_LOG} getUserProfile`, { userId, found: true });
      return JSON.stringify(profile);
    }
    case "updateUserProfile": {
      userId = toolArgs.userId ?? context?.userId;
      if (!userId) {
        console.log(`${TOOL_LOG} updateUserProfile`, { error: "no userId" });
        return JSON.stringify({ error: "User ID is required to update profile" });
      }
      const { userId: _, ...data } = toolArgs;
      const updated = await upsertUserProfileByUserId(userId, data as { activityLevel: string, climate: string, dietaryPreference?: string, hydrationGoal?: string });
      console.log(`${TOOL_LOG} updateUserProfile`, { userId });
      return JSON.stringify(updated);
    }
    default:
      console.error(`${TOOL_LOG} unknown tool`, { toolName });
      throw new AppError("Unknown tool requested, please try again", 500);
  }
  } catch (err) {
    if (err instanceof AppError) throw err;
    console.error(`${TOOL_LOG} execution error`, {
      toolName,
      error: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
};
