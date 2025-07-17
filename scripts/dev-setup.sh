#!/bin/bash
# NutriBianca - Automated Development Environment Setup
# Configures WSL2/Ubuntu for the monorepo stack

set -e

echo "🚀 NutriBianca Dev Setup - Starting..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential curl file git direnv fzf bat libnss3-tools

# Install Volta (Node.js version manager)
echo "⚡ Installing Volta + Node.js..."
if ! command -v volta &> /dev/null; then
    curl https://get.volta.sh | bash
    export VOLTA_HOME="$HOME/.volta"
    export PATH="$VOLTA_HOME/bin:$PATH"
fi
volta install node@18 pnpm

# Install Deno
echo "🦕 Installing Deno..."
if ! command -v deno &> /dev/null; then
    curl -fsSL https://deno.land/install.sh | sh
    echo 'export DENO_INSTALL="$HOME/.deno"' >> ~/.bashrc
    echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.bashrc
fi

# Install mkcert for local TLS
echo "🔒 Installing mkcert..."
if ! command -v mkcert &> /dev/null; then
    curl -L https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64 -o /tmp/mkcert
    sudo install /tmp/mkcert /usr/local/bin/
    mkcert -install
fi

# Configure shell integrations
echo "🔧 Configuring shell integrations..."
grep -q 'direnv hook bash' ~/.bashrc || echo 'eval "$(direnv hook bash)"' >> ~/.bashrc

echo "✅ Setup complete! Please run 'source ~/.bashrc' to reload your shell."
echo "🧪 Test with: docker run hello-world && deno --version && node --version"