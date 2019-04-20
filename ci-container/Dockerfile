FROM node

RUN apt-get update -y &&\
    apt-get install -y default-jre

RUN apt-get install -y fonts-liberation && \
    apt-get install -y libappindicator3-1 && \
    apt-get install -y libxss1 && \
    apt-get install -y lsb-release && \
    apt-get install -y xdg-utils && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg -i google-chrome-stable_current_amd64.deb
