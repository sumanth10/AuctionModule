import sys
import fileinput

if len(sys.argv) != 2:
    print ('Cluster name not provided')
    sys.exit(1)
with fileinput.FileInput("cwagent-configmap.yaml", inplace=True) as file:
    for line in file:
        print(line.replace('{{cluster_name}}', sys.argv[1]), end='')