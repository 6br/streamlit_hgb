# Streamlit-HGB

A streamlit component for a hybrid genome browser

* virtualenv

```bash
$ python3 -m venv venv  # create venv
$ . venv/bin/activate   # activate venv
$ pip install streamlit # install streamlit
$ pip install pyyaml # install pyyaml
```

* frontend

```bash
$ template/hgb/frontend
$ npm install    # Initialize the project and install npm dependencies
$ npm run start  # Start the Webpack dev server
```

* backend

```bash
export STREAMLIT_HOST=$(hostname -i)
export HGB_BIN=/*location_to_hgb_binary */

streamlit run hgb/__init__.py 
```
