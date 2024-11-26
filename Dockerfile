# syntax=docker/dockerfile:1

# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=18.18.0

############################################################
#                           DEPS                           #
############################################################

FROM public.ecr.aws/docker/library/node:${NODE_VERSION}-bullseye-slim AS deps

WORKDIR /app

# Copy the files required to install our dependencies
COPY package.json ./
COPY yarn.lock ./

# Install Dependencies & clear the yarn cache
RUN yarn install --frozen-lockfile --network-timeout 300000 && \
    yarn cache clean

############################################################
#                         BUILDER                          #
############################################################

FROM public.ecr.aws/docker/library/node:${NODE_VERSION}-bullseye-slim AS builder

WORKDIR /app

# Copy over our deps from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the remaining source files into the image
COPY . .

# Run initial setup
RUN yarn initial:setup && mkdir .logs

############################################################
#                          RUNNER                          #
############################################################

FROM public.ecr.aws/docker/library/node:${NODE_VERSION}-bullseye-slim AS runner

WORKDIR /app

# Create a new user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

# Copy the application artifacts
COPY --from=builder --chown=appuser:nodejs /app ./

# Switch to the appuser user to run the application
USER appuser

ENV NODE_ENV=production

# Run the application
CMD ["yarn", "start", "--file=example-data/friends.csv"]
