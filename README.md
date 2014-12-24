ratchet-v2-provider-desktop
===========================
## Dependencies

1. Install **JDK1.8**

2. Install **gvm**

	```
    curl -s get.gvmtool.net | bash
    ```
3. Install **grails**

	```
	gvm install grails 2.4.4
	```


## Compass Optional

#### (You should choose one of them)

1. Install **compass-sass plugin** (**option one**)

	- Add plugins in buildConfig.groovy(**Already add**)

	```
   		compile ":compass-sass:0.7"
        runtime ":resources:1.2.13"
    ```

	- Install **Homebrew**

    ```
    ruby -e '$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)'
    ```
	- Install **Ruby**

  		 - Now that we have Homebrew installed, we can use it to install Ruby.
   		 We're going to use rbenv to install and manage our Ruby versions.
   		 To do this, run the following commands in your Terminal:

    ```
       brew install rbenv ruby-build

       # Add rbenv to bash so that it loads every time you open a terminal
       echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
       source ~/.bash_profile

       # Install Ruby 2.1.3 and set it as the default version
       rbenv install jruby 1.7.9
       rbenv global jruby 1.7.9

       ruby -v
       # jruby-1.7.9
    ```
	 - Install **Compass**

   ```
   		gem update --system
   		gem install compass
   ```

	- Setup **JRuby** Path
  		 - Set up the ruby environment for compass-sass plugin

  	 ```
      cd /etc
      sudo vim launchd.conf
      # added the following line to it
      setenv PATH /usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:your-JRuby-Path
      # restarted your machine so that the new launchd config would take effect
  	 ```

2. Not Install **compass-sass plugin** (**option two**)

	- remove plugins in buildConfig.groovy

	```
   		//compile ":compass-sass:0.7"
        //runtime ":resources:1.2.13"
    ```

     - Install **Compass**

   ```
   		gem update --system
   		gem install compass
   ```


## Synchronize Grails Settings


1. If you **use jRuby**

	```
        bower install
        grails run-app
    ```


2. If you **don't use jRuby**


	```
        cd /ratchet-v2-admin-portal/grails-app/assets/stylesheets
        compass watch
    ```

	```
        bower install
        grails run-app
    ```