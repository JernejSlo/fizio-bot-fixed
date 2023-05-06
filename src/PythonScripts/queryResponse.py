import sys
import json

def query_response(data):
    return data + ". I received the message"


if __name__ == '__main__':
    # Get the arguments from the command line
    args = json.loads(sys.argv[1])

    # Parse the arguments and call the function
    data = args.get('data')
    result = query_response(data)

    # Return the result as a JSON object
    print(json.dumps({'result': result}))
