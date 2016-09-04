#!/usr/bin/perl

#This is a single-line comment. Above text is required for perl programs

=begin comment
	This
	is
	a
	multi-line
	comment
=cut

#use these for precision
use strict;   #strict requires things like accurate scoping using 'my'
use warnings; #warnings tells you some things the interpreter won't

#This is a subroutine:
sub demonstrate_subroutines{
	print "The subroutine works!\n"
}

sub demonstrate_interpolation{
	my @passed=@_; #how to accept a scalar value in a subroutine
	#use single quotes for non-interpolated
	print "Value of passed = @passed\n";
	print 'Value of passed = @passed\n';
	print "\n";
}

sub demonstrate_whitespace{
	print             "Perl doesn't give a shit about whitespace.\n";
	print "Unless
	it's
		in
			quotes\n";
}

#subroutine calls
demonstrate_subroutines();
demonstrate_interpolation(10); #passing a scalar value
my $x = (10); #declaring a scalar
demonstrate_interpolation($x); #passing a scalar variable
demonstrate_whitespace();
#demonstrate_passing_lists();
#demonstrate_passing_hashes();
#demonstrate_passing_references;