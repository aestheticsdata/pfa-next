#!/bin/bash

echo "⏹️  Stopping previous pm2 processes..."
pm2 delete all

echo "🚀 Starting app with dev environment..."
pm2 start ecosystem.config.js --env dev

echo "📋 Current status:"
pm2 list