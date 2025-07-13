import { db } from "../db/connection.ts";
import { schema } from "../db/schema/index.ts";

async function resetDatabase() {
  console.log("🗑️  Iniciando reset completo do banco de dados...");

  try {
    // Limpa todas as tabelas na ordem correta (respeitando foreign keys)
    console.log("🧹 Limpando tabela questions...");
    await db.delete(schema.questions);

    console.log("🧹 Limpando tabela audioChunks...");
    await db.delete(schema.audioChunks);

    console.log("🧹 Limpando tabela rooms...");
    await db.delete(schema.rooms);

    console.log("✅ Todas as tabelas foram limpas com sucesso!");
    console.log("🎉 Banco de dados resetado completamente!");
  } catch (error) {
    console.error("❌ Erro ao resetar banco de dados:", error);
    throw error;
  }
}

// Executa o script
resetDatabase()
  .then(() => {
    console.log("✨ Reset concluído com sucesso!");
    console.log('💡 Execute "npm run db:seed" para popular novamente o banco');
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Erro fatal:", error);
    process.exit(1);
  });

export { resetDatabase };
