git config --global user.email "lqwangxg@gmail.com"
git config --global user.name "lqwangxg"

git add . 
git commit -a -m "commit"

branch=master
if [ -n $1 ]; then # -z: is empty; -n: is not empty.
  branch=$1
fi
git push -u origin $branch
