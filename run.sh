#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "Instalando dependências do backend..."
(
  cd "$ROOT/backend"
  pnpm install
)

echo "Instalando dependências da raiz..."
(
  cd "$ROOT"
  pnpm install
)

echo "Instalação concluída."
