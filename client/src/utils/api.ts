import client from '../apolloClient';
import { DocumentNode } from "@apollo/client";

export const graphqlRequest = async (
  query: DocumentNode,
  variables: Record<string, any> = {}
) => {
  try {
    const result = await client.query({
      query,
      variables,
      fetchPolicy: "no-cache",
    });
    return result.data;
  } catch (error) {
    console.error("GraphQL Request Error:", error);
    throw error;
  }
};

export const graphqlMutation = async (
  mutation: DocumentNode,
  variables: Record<string, any> = {}
) => {
  try {
    const result = await client.mutate({
      mutation,
      variables,
    });

    return result.data;
  } catch (error) {
    console.error("GraphQL Mutation Error:", error);
    throw error;
  }
};
