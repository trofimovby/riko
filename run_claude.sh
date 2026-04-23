#!/bin/zsh

# Настройки для запуска через OmniRoute
export ANTHROPIC_AUTH_TOKEN="sk-45fa3d4fc0ebc4f3-1b32df-1382617f"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1

# ЗАКРЫВАЕМ кавычку в конце строки ниже:
export ANTHROPIC_MODEL="kr/claude-sonnet-4.5"

echo "Starting Claude Code via OmniRoute..."
claude