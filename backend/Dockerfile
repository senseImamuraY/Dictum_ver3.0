FROM ruby:3.1.2-buster

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs default-mysql-client 

# ENV RAILS_ENV=production

ENV APP_PATH /myapp

RUN mkdir $APP_PATH
WORKDIR $APP_PATH

COPY Gemfile $APP_PATH/Gemfile
COPY Gemfile.lock $APP_PATH/Gemfile.lock

# 変更を追記いたしました。
RUN bundle config set force_ruby_platform true

RUN bundle install

COPY . $APP_PATH

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
RUN mkdir -p tmp/sockets
RUN mkdir -p tmp/pids

CMD ["rails", "server", "-b", "0.0.0.0"]
# COPY start.sh /start.sh
# RUN chmod 744 /start.sh
# CMD ["sh", "/start.sh"]

# CMD ["rails", "server", "-b", "0.0.0.0"]
# RUN ["apt-get", "install", "-y", "vim"]