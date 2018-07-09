DB_NAME="organise_$1"

if ! [[ "$1" == "test" || "$1" == "dev" || "$1" == "production" ]]

then
echo Missing or invalid environment specified use
echo     build.sh env
echo where env is one of 'test', 'dev' or 'production'
exit 1

fi


echo Creating DATABASE $DB_NAME

echo "DROP DATABASE IF EXISTS $DB_NAME;" > ACTION
echo "CREATE DATABASE $DB_NAME;" >> ACTION
echo "\c $DB_NAME;" >> ACTION
cat build.sql >> ACTION

psql -f ACTION -q && echo Done.
rm ACTION