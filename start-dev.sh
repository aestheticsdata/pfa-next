#!/bin/bash

# Fonction pour nettoyer les processus à l'arrêt
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    pm2 delete all 2>/dev/null
    if [ ! -z "$CLIENT_PID" ]; then
        kill $CLIENT_PID 2>/dev/null
    fi
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT SIGTERM

echo "⏹️  Stopping previous pm2 processes..."
pm2 delete all

echo "🚀 Starting API with dev environment..."
cd api
pm2 start ecosystem.config.js --env dev
cd ..

echo "⏳ Waiting for API to start..."
sleep 2

echo "🚀 Starting Next.js client..."
cd pfa-client-next
pnpm dev &
CLIENT_PID=$!
cd ..
echo "📋 Current status:"
pm2 list

echo ""
echo "✅ API running on http://localhost:5000"
echo "✅ Next.js client running on http://localhost:3000"
echo "💡 Press Ctrl+C to stop both services"

# Attendre que les processus se terminent
wait $CLIENT_PID
