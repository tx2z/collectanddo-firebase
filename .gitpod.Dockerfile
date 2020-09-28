FROM gitpod/workspace-full

USER gitpod
RUN npm install -g @ionic/cli
USER root