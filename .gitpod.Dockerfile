FROM gitpod/workspace-full

# Install ionic framework
RUN bash -c ". ~/.nvm/nvm-lazy.sh && npm install -g @ionic/cli"