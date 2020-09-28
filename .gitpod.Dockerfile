FROM gitpod/workspace-full

USER gitpod
RUN envsubst < /workspace/collectanddo-firebase/src/assets/env.template.js > /workspace/collectanddo-firebase/src/assets/env.js
RUN npm install -g @ionic/cli
USER root