#!/usr/bin/perl

=begin comment 

***************************************
*   Author:  Brian Reynolds           *
*   Program: gene_analytics_example   *
*   Date:    09/22/16                 *
***************************************

=cut

use strict;
use warnings;

my @PTTG1IP = read_gene();

#read index file
open(INDEX, "<index.txt") or die "Couldn't open file index.txt, $!";
our @indices=<INDEX>;
close(INDEX);

my @exon_lengths   = index_input(@indices);
my @intron_lengths = index_input(@indices);

my (@exon_starts, @intron_starts);
get_start_points(\@exon_starts, \@intron_starts, \@exon_lengths, \@intron_lengths);


=begin
***********************
*                     *
* Gene Analytics Menu *
*                     *
***********************
=cut

my ($choice, $number, $start, $end);
do {
	display_menu();
	$choice = <STDIN>;
	chomp($choice);
	if($choice){
		if ($choice == 1){
			print_from_to(0, 1000, @PTTG1IP);
			print "\n";
		} 
		elsif ($choice == 2){
			print "Exon number (1,2,3,etc.): ";
			$number = <STDIN>;
			if ($number >= 0 && $number<=scalar(@exon_lengths)){
				$start = $exon_starts[$number-1];
				$end   = $start + $exon_lengths[$number-1];
				print_from_to($start, $end, @PTTG1IP);
			} else{
				print "***Error: Invalid choice or exon does not exist***\n";
			}
		} 
		elsif ($choice == 3){
			print "Intron number (1,2,3,etc.): ";
			$number = <STDIN>;
			if ($number>=0 && $number<=scalar(@intron_lengths)){
				$start = $intron_starts[$number-1];
				$end   = $start + $intron_lengths[$number-1];
				print_from_to($start, $end, @PTTG1IP);
			} else{
				print "***Error: Invalid choice or exon does not exist***\n";
			}
		} 
		elsif ($choice == 4){
			print "Enter start point: ";
			$start = <STDIN>-1;
			print "Enter end point:   ";
			$end   = <STDIN>-1;
			print_from_to($start, $end, @PTTG1IP);
		}
		elsif ($choice == 5){
			$start = 0;
			$end   = scalar(@PTTG1IP) - 1;
			print_from_to($start, $end, @PTTG1IP);
		}	else{
			print "Invalid choice\n";
		}
	}
} while ($choice != 0);


=begin

**********************************************
*                                            *
*        Subroutines Below This Point        *
*                                            *
**********************************************

=cut

#display main menu
sub display_menu{
	print "\n",
		  "***********************\n",
		  "* Gene Analytics Menu *\n",
		  "* 0: Quit             *\n",
		  "* 1: View Promoter    *\n",
		  "* 2: View Exons       *\n",
		  "* 3: View Introns     *\n",
		  "* 4: View Section     *\n",
		  "* 5: View Entire Gene *\n",
		  "***********************\n",
		  "\n",
		  "Choice: "

}

#get starting positions for introns and exons
sub get_start_points{
	my ($exon_starts, $intron_starts, $exon_lengths, $intron_lengths) = shift(@_);
	
	@$exon_lengths   = @exon_lengths;
	@$intron_lengths = @intron_lengths;
	
	my $coding = 1;
	my $start  = 1000;
	while (@$exon_lengths){
		if ($coding){
			push(@exon_starts, $start);
			$start+=shift(@$exon_lengths);
			$coding = 0;
		} else{
			push(@intron_starts, $start);
			$start+=shift(@$intron_lengths);
			$coding = 1;
		}
	}
}

sub read_gene{
	#read in PTTG1IP
	open(PTTG1IP, "<PTTG1IP.txt") or die "Couldn't open file PTTG1IP.txt, $!";
	my @lines =<PTTG1IP>;

	close(PTTG1IP);

	#break up into annotations
	our @gene;
	foreach (@lines){
		my @annotations = split //, $_;
		for (my $i=0; $i<scalar(@annotations); $i+=1){
			if ($annotations[$i] ne "\n" && $annotations[$i] ne "\r"){
				push(@gene, $annotations[$i]);
			}
		}	
	}
	return @gene;
}

#process indices
sub index_input{
	our @indices = @_;
	
	my @lengths;
	my $read = shift(@indices);
	
	while($read) {
		my $temp = shift(@indices);
		push(@lengths, $temp);
		$read-=1;
	}
	
	return @lengths;
}

#print entire list
sub print{
	my @list = @_;
	for (my $i=0; $i<scalar(@list); $i+=1){
		print "$list[$i]";
	}
}

#print list section
sub print_from_to{
	my ($start, $end, @list) = @_;
	for (my $i=$start; $i<$end; $i++){
		print $PTTG1IP[$i];
	}
	
}


