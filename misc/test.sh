#!/bin/bash

echo "M17" > /dev/ttyACM0
echo "G91" > /dev/ttyACM0
echo "G28" > /dev/ttyACM0
echo "G0 X50 F2000" > /dev/ttyACM0
echo "M18" > /dev/ttyACM0
