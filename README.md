ratchet-v2-provider-desktop
===========================
## Dependencies

 1. JDK 1.7+
 2. Grails 2.4.4

  - Install **gvm**  Go to [gvm home page](http://gvmtool.net/)
  - Install **grails**
    ```bash
       $ gvm install grails
    ```
 3. Install Homebrew
 
    - Open Terminal and run the following command:
    ```bash
       ruby -e '$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)'
    ```
 4. Install Ruby 
    
   - Now that we have Homebrew installed, we can use it to install Ruby.We're going to use rbenv to install and manage our Ruby versions.To do this, run the following commands in your Terminal:
    ```bash
       brew install rbenv ruby-build
       # Add rbenv to bash so that it loads every time you open a terminal
       echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
       source ~/.bash_profile

       # Install Ruby 2.1.3 and set it as the default version
       rbenv install jruby 1.7.9
       rbenv global jruby 1.7.9

       ruby -v
       # jruby 1.7.9
    ```
 5. Install Compass
   - After that, we can install compass.
   ```bash
      gem update --system
      gem install compass
   ```
 6. Setup JRuby Path
   - Setting up the ruby environment for compass-sass plugin
   ```bash
      cd /etc
      sudo vim launchd.conf
      # added the following line to it
      setenv PATH /usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin: your JRuby path
      # restarted your machine so that the new launchd config would take effect
   ```
 
## Run
 - Start
    ```bash
       $ gvm install grails
    ```
        

