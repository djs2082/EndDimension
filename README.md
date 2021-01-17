# steps to run
# start django server
  # setup
    cd to EndDimension/backend/EndDimension
    pip3 install -r requirements.txt
    python3 manage.py makemigrations
    python3 manage.py migrate
  # create hospital user
    python3 manage.py createsuperuser
  # run server
    python3 manage.py runserver
# start react server in another terminal
  # setup
    cd to EndDimension/frontend
    sudo npm install
    sudo npm start
    
