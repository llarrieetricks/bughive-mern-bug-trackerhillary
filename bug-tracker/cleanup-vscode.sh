#!/bin/bash

# VS Code Clean Up Script
# This script clears VS Code cache and settings to ensure fresh configuration

echo "🧹 Cleaning VS Code Configuration..."

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "Detected: Linux"
    VSCODE_DIR="$HOME/.config/Code"
    
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "Detected: macOS"
    VSCODE_DIR="$HOME/Library/Application Support/Code"
    
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    echo "Detected: Windows"
    VSCODE_DIR="$APPDATA/Code"
else
    echo "❌ Unknown OS: $OSTYPE"
    exit 1
fi

# Close VS Code if running
if command -v killall &> /dev/null; then
    killall "Code" 2>/dev/null || true
    killall "code" 2>/dev/null || true
    sleep 2
    echo "✓ Closed VS Code (if running)"
fi

# Backup current settings
if [ -d "$VSCODE_DIR" ]; then
    echo "📦 Backing up current settings..."
    mkdir -p "$VSCODE_DIR/backups"
    BACKUP_DIR="$VSCODE_DIR/backups/backup_$(date +%Y%m%d_%H%M%S)"
    cp -r "$VSCODE_DIR" "$BACKUP_DIR" 2>/dev/null || true
    echo "✓ Backup created at: $BACKUP_DIR"
fi

# Clear specific caches
echo "🗑️  Clearing caches..."

# Extension cache
rm -rf "$VSCODE_DIR/CachedExtensions" 2>/dev/null && echo "  ✓ Cleared extension cache"
rm -rf "$VSCODE_DIR/Cache" 2>/dev/null && echo "  ✓ Cleared general cache"
rm -rf "$VSCODE_DIR/Code Cache" 2>/dev/null && echo "  ✓ Cleared code cache"

# Workspace cache
rm -rf "$VSCODE_DIR/Workspaces" 2>/dev/null && echo "  ✓ Cleared workspaces cache"

# Language server cache
rm -rf "$VSCODE_DIR/User/workspaceStorage" 2>/dev/null && echo "  ✓ Cleared workspace storage"

# CSS validator cache (if exists)
rm -rf "$VSCODE_DIR/User/CSS" 2>/dev/null

echo "✓ Cache clearing complete"

# Reload VS Code
echo ""
echo "ℹ️  Restart VS Code to apply clean configuration"
echo ""
echo "Next steps:"
echo "1. Reload VS Code (Ctrl+R or Cmd+Shift+P → Reload Window)"
echo "2. Install recommended extensions when prompted"
echo "3. Run 'Start Both Servers' task"
echo ""
echo "✅ Cleanup complete!"
