#!/bin/bash

# Load .env file
set -o allexport
source .env
set +o allexport

# Configuration - Update these variables with your information
FTP_USER="$FTP_USER"
FTP_PASS="$FTP_PASS"
FTP_HOST="$FTP_HOST"
FTP_DIR="/public_html"

# Step 1: Build the React app
echo "Building React application..."
npm run build

if [ $? -ne 0 ]; then
  echo "Build failed. Aborting deployment."
  exit 1
fi

# Step 2: Change to the build directory
cd build

# Step 3: Use FTP to upload the files
echo "Uploading files to Namecheap hosting..."

# Create a temporary LFTP script
cat > deploy.lftp << EOL
open -u $FTP_USER,$FTP_PASS ftp://$FTP_HOST
set ssl:verify-certificate no
mirror -R --delete --verbose --ignore-time . $FTP_DIR
bye
EOL

# Execute the LFTP script (requires lftp to be installed)
lftp -f deploy.lftp

# Clean up
rm deploy.lftp

cd ..
echo "Deployment completed successfully!"