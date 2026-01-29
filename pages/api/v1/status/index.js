import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  // Cache-Control: s-maxage=10 para Vercel ISR
  // public: cacheable em CDN
  // s-maxage=10: Vercel Server Store por 10 segundos
  // stale-while-revalidate=59: Serve stale content enquanto revalida
  response.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59",
  );

  const updatedAt = new Date().toISOString();

  const dataBaseVersionReulst = await database.query("SHOW server_version;");
  const databaseVersionValue = dataBaseVersionReulst.rows[0].server_version;

  const databaseMaxConnectionsResults = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResults.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
