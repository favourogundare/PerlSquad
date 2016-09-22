#!/usr/bin/perl

use strict;
use warnings;

# Test for printing
print "Hello World!\n";

# Creates a simple test string
my $test_str = "This is a test string\n";

# Print out the test string
print $test_str;

# Split string into elements of an array
my @test_str_arr = split ' ', $test_str;

#Test printing as an array

foreach(@test_str_arr){
	print($_);
	print(" ");
}
print "[as an array]\n";

#Test adding elements to an array

push (@test_str_arr, "split");
push (@test_str_arr, "up");

foreach(@test_str_arr){
	print($_);
	print(" ");
}

print "\n";

#Test making a loop

for my $i (1, 2, 3) {
	print "loop $i!\n";
}

#Test stepping through an array with a loop

pop (@test_str_arr); pop (@test_str_arr);
push (@test_str_arr, "walked");
push (@test_str_arr, "through");
push (@test_str_arr, "with");
push (@test_str_arr, "loops");
for my $i (@test_str_arr){
	print "$i\n";
}

print "\n";
