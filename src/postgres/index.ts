import { Pool, PoolConfig, QueryResult, PoolClient } from "pg";

let pool: Pool = null;

export const configurePool = (config: PoolConfig): void => {
  pool = new Pool(config);
  pool.on("error", (err: Error, client: PoolClient) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
  });
};

export const sqlQuery = async (queryString: string, values?: Array<any>): Promise<any> => {
  if (!pool) {
    console.error("Pool hasn't been configured yet!");
  } else {
    const client = await pool.connect();
    try {
      const results: QueryResult<any> = await client.query(queryString, values);
      // console.log(results);
      return results.rows;
    } catch (e) {
      throw new Error(`Query error: ${e}`);
    } finally {
      client.release();
    }
  }
};
