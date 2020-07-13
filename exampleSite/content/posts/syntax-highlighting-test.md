---
title: "Syntax Highlighting Test"
description: "A page full of code samples."
tags: [ extra, "syntax highlighting" ]
toc: true
---

## Bash

```bash
#!/bin/bash

cd $ROOT_DIR
DOT_FILES="lastpass weechat ssh Xauthority"

for dotfile in $DOT_FILES; do conform_link "$DATA_DIR/$dotfile" ".$dotfile"; done

# TODO: refactor with suffix variables (or common cron values)

case "$PLATFORM" in
    linux)
        #conform_link "$CONF_DIR/shell/zshenv" ".zshenv"
        crontab -l > $ROOT_DIR/tmp/crontab-conflict-arch
        cd $ROOT_DIR/$CONF_DIR/cron
        if [[ "$(diff ~/tmp/crontab-conflict-arch crontab-current-arch)" == ""
            ]];
            then # no difference with current backup
                logger "$LOG_PREFIX: crontab live settings match stored "\
                    "settings; no restore required"
                rm ~/tmp/crontab-conflict-arch
            else # current crontab settings in file do not match live settings
                crontab $ROOT_DIR/$CONF_DIR/cron/crontab-current-arch
                logger "$LOG_PREFIX: crontab stored settings conflict with "\
                    "live settings; stored settings restored. "\
                    "Previous settings recorded in ~/tmp/crontab-conflict-arch."
        fi
    ;;
```

## C

```c
#define UNICODE
#include <windows.h>

int main(int argc, char **argv) {
  int speed = 0, speed1 = 0, speed2 = 0; // 1-20
  printf("Set Mouse Speed by Maverick\n");

  SystemParametersInfo(SPI_GETMOUSESPEED, 0, &speed, 0);
  printf("Current speed: %2d\n", speed);

  if (argc == 1) return 0;
  if (argc >= 2) sscanf(argv[1], "%d", &speed1);
  if (argc >= 3) sscanf(argv[2], "%d", &speed2);

  if (argc == 2) // set speed to first value
    speed = speed1;
  else if (speed == speed1 || speed == speed2) // alternate
    speed = speed1 + speed2 - speed;
  else
    speed = speed1;  // start with first value

  SystemParametersInfo(SPI_SETMOUSESPEED, 0,  speed, 0);
  SystemParametersInfo(SPI_GETMOUSESPEED, 0, &speed, 0);
  printf("New speed:     %2d\n", speed);
  return 0;
}
```

## CSS

```css
/* CSS Comment */
#some-id .some-class {
  float: left;
  width: 100px;
}
```

## Go

```go
package main
import "fmt"
func main() {
    fmt.Println("Hello, 世界")
}
```

## Haskell

```haskell
{-# LANGUAGE OverloadedStrings #-}
module Main where

--import Prelude hiding (id)
--import Control.Category (id)
import Control.Arrow ((>>>), (***), arr)
import Control.Monad (forM_)
-- import Data.Monoid (mempty, mconcat)
-- import System.FilePath

import Hakyll

main :: IO ()
main = hakyll $ do

    route   "css/*" $ setExtension "css"
    compile "css/*" $ byExtension (error "Not a (S)CSS file")
        [ (".css",  compressCssCompiler)
        , (".scss", sass)
        ]

    route   "js/**" idRoute
    compile "js/**" copyFileCompiler

    route   "img/*" idRoute
    compile "img/*" copyFileCompiler

    compile "templates/*" templateCompiler

    forM_ ["test.md", "index.md"] $ \page -> do
        route   page $ setExtension "html"
        compile page $ pageCompiler
            >>> applyTemplateCompiler "templates/default.html"
            >>> relativizeUrlsCompiler

sass :: Compiler Resource String
sass = getResourceString >>> unixFilter "sass" ["-s", "--scss"]
                         >>> arr compressCss
```

## HTML

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>A Tiny Page</title>
    <!-- Valid HTML Comment -->
    <style type="text/css">
    <!-- Invalid HTML Comment -->
      /* Inline CSS Comment */
      p {
        font-size: 15pt;
        color: #000;
        float: right;
      }
    </style>
  </head>
  <body bgcolor="#FFFFFF" text="#000000" link="#0000CC">
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <!--  Valid HTML Comment -->
    <script language="javascript" type="text/javascript">
      function changeHeight(h) {
        var tds = document.getElementsByTagName("td");
        for(var i = 0; i < tds.length; i++) {
          tds[i].setAttribute("height", h + "px");
      }}
    </script>
  </body>
</html>
```

## Java

```java
import java.util.Map;
import java.util.TreeSet;

public class GetEnv {
  /**
   * let's test generics
   * @param args the command line arguments
   */
  public static void main(String[] args) {
    // get a map of environment variables
    Map<String, String> env = System.getenv();
    // build a sorted set out of the keys and iterate
    for(String k: new TreeSet<String>(env.keySet())) {
      System.out.printf("%s = %s\n", k, env.get(k));
    }
  }    
}
```

## JavaScript

```javascript
// Inline Comment
var undefined,
    xui,
    window     = this,
    string     = new String('string'),
    document   = window.document,
    simpleExpr = /^#?([\w-]+)$/;

/** 
 * Block Comment
 */ 
function changeHeight (h) {
  var tds = document.getElementsByTagName("td");

  for (var i = 0; i < tds.length; i++) {
    tds[i].setAttribute("height", h + "px");
  }
}
```

## JSON

```json
{
  "employees": [{
    "firstName": "John", 
    "lastName": "Doe"
  }]
}
```

## Objective-C

```objective-c
#import "Cocoa1AppDelegate.h"

@implementation Cocoa1AppDelegate

@synthesize window,siteUrl,pageContents;

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
    // Insert code here to initialize your application
    model = [[Cocoa1Model alloc] init];
}

- (IBAction)getSiteContents:(id)sender {
    [model setPageUrl:[siteUrl stringValue]];
    NSString* reply = [model getUrlAsString];
    NSLog(@"pageSrc: %@", reply);
    [pageContents setString:reply];
    [[[pageContents textStorage] mutableString] appendString:reply];
}

@end
```

## Perl

```perl
#!perl -w

# Time-stamp: <2002/04/06, 13:12:13 (EST), maverick, csvformat.pl>
# Two pass CSV file to table formatter

$delim = $#ARGV >= 1 ? $ARGV[1] : ',';
print STDERR "Split pattern: $delim\n";

# first pass
open F, "<$ARGV[0]" or die;
while(<F>)
{
  chomp;
  $i = 0;
  map { $max[$_->[1]] = $_->[0] if $_->[0] > ($max[$_->[1]] || 0) }
    (map {[length $_, $i++]} split($delim));
}
close F;

print STDERR 'Field width:   ', join(', ', @max), "\n";
print STDERR join(' ', map {'-' x $_} @max);

# second pass
open F, "<$ARGV[0]" or die;
while(<F>)
{
  chomp;
  $i = 0;
  map { printf("%-$max[$_->[1]]s ", $_->[0]) }
    (map {[$_, $i++]} split($delim));
  print "\n";
}
close F;
```

## PHP

```php
<?php

require_once($GLOBALS['g_campsiteDir']. "/$ADMIN_DIR/country/common.php");
require_once($GLOBALS['g_campsiteDir']. "/classes/SimplePager.php");

camp_load_translation_strings("api");

$f_country_language_selected = camp_session_get('f_language_selected', '');
$f_country_offset = camp_session_get('f_country_offset', 0);

if (empty($f_country_language_selected)) {
    $f_country_language_selected = null;
}

$ItemsPerPage = 20;
$languages = Language::GetLanguages(null, null, null, array(), array(), true);
$numCountries = Country::GetNumCountries($f_country_language_selected);

$pager = new SimplePager($numCountries, $ItemsPerPage, "index.php?");

$crumbs = array();
$crumbs[] = array(getGS("Configure"), "");
$crumbs[] = array(getGS("Countries"), "");

echo camp_html_breadcrumbs($crumbs);

?>

<?php if ($g_user->hasPermission("ManageCountries")) { ?>
<table BORDER="0" CELLSPACING="0" CELLPADDING="1">
    <tr>
        <td><a href="add.php"><?php putGS("Add new"); ?></a></td>
    </tr>
</table>
<?php } ?>
```

## Python

```python
# Inline Python Comment
class ExitNotifyThread(Thread):
    """
    Block-Level Python Comment
    """
    def run(self):
        global exitthreads, profiledir
        self.threadid = thread.get_ident()
        try:
            if not profiledir: # normal case
                Thread.run(self)
            else:
                try:
                    import cProfile as profile
                except ImportError:
                    import profile
                prof = profile.Profile()
                try:
                    prof = prof.runctx("Thread.run(self)", globals(), locals())
                except SystemExit:
                    pass
                prof.dump_stats( \
                            profiledir + "/" + str(self.threadid) + "_" + \
                            self.getName() + ".prof")
        except:
            self.setExitCause('EXCEPTION')
            if sys:
                self.setExitException(sys.exc_info()[1])
                tb = traceback.format_exc()
                self.setExitStackTrace(tb)
        else:
            self.setExitCause('NORMAL')
        if not hasattr(self, 'exitmessage'):
            self.setExitMessage(None)

        if exitthreads:
            exitthreads.put(self, True)

    def setExitCause(self, cause):
        self.exitcause = cause
    def getExitCause(self):
        """Returns the cause of the exit, one of:
        'EXCEPTION' -- the thread aborted because of an exception
        'NORMAL' -- normal termination."""
        return self.exitcause
    def setExitException(self, exc):
        self.exitexception = exc
    def getExitException(self):
        """If getExitCause() is 'EXCEPTION', holds the value from
        sys.exc_info()[1] for this exception."""
        return self.exitexception
    def setExitStackTrace(self, st):
        self.exitstacktrace = st
    def getExitStackTrace(self):
        """If getExitCause() is 'EXCEPTION', returns a string representing
        the stack trace for this exception."""
        return self.exitstacktrace
    def setExitMessage(self, msg):
        """Sets the exit message to be fetched by a subsequent call to
        getExitMessage.  This message may be any object or type except
        None."""
        self.exitmessage = msg
    def getExitMessage(self):
        """For any exit cause, returns the message previously set by
        a call to setExitMessage(), or None if there was no such message
        set."""
        return self.exitmessage
```

## Ruby

```ruby
desc "Edit a post (defaults to most recent)"
task :edit_post, :title do |t, args|
  args.with_defaults(:title => false)
  posts = Dir.glob("#{source_dir}/#{posts_dir}/*.*")
  post = (args.title) ? post = posts.keep_if {|post| post =~ /#{args.title}/}.last : posts.last
  if post
    puts "Opening #{post} with #{editor}..."
    system "#{ENV['EDITOR']} #{post} &"
  else
    puts "No posts were found with \"#{args.title}\" in the title."
  end
end
```

## SCSS

```scss
@import "grids";

$blue: blue;

a.myAnchor {
    color: $blue;
    &:hover {
        text-decoration: underline;
    }
    &:visited {
        color: purple;
    }
}

.error-input {
  @extend .input;
  border: 4px solid #e74c3c;
}

%input-style {
    font-size: 14px;
}

input {
    @extend %input-style;
    color: black;
}

@mixin media($queryString){
    @media #{$queryString} {
      @content;
    }
}

@function getColumnWidth($width, $columns,$margin){
    @return ($width / $columns) - ($margin * 2);
}

$settings: (
    maxWidth: 800px,
    columns: 12,
    margin: 15px,
    breakpoints: (
        xs: "(max-width : 480px)",
        sm: "(max-width : 768px) and (min-width: 481px)",
        md: "(max-width : 1024px)  and (min-width: 769px)",
        lg: "(min-width : 1025px)"
    )
);
```

## SQL

```sql
SELECT column_name, column_name FROM table_name;
```

## XML

```xml
<employees>
    <employee>
        <firstName>John</firstName> <lastName>Doe</lastName>
    </employee>
</employees>
```

---
Source:
[markdown-pygments-syntax-highlighting-test.md · GitHub](https://gist.github.com/cbracco/32036db5425d23de70c3dd9a846517d0)
