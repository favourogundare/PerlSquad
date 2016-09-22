# usr/bin/perl

use warnings;
use strict;

use Bio::DB::Fasta;
use pfam_search;

use Cwd;

my $pwd = cwd();

my $USAGE="use the format below"."\n"."perl annotated_proteome_superfamily_search.pl -t superfamily_seed_path -f family_name (multifamilies are separated with #) -s superfamily"."\n";

# perl annotated_proteome_UBLfamily_search.pl -t /home/fo893113/ctt/seed/PF00240_full_ubiquitin_seeds.txt -f ubiquitin -s Ub

unless(@ARGV){
die "Error opening","\n",$USAGE;
	}

my $family_seed=$ARGV[1];
my $families=$ARGV[3];
my $superfamily=$ARGV[5];

#APG12;Atg8;Cobl;DUF2407;Multi_ubiq;Prok_Ub;Rad60-SLD;Rad60-SLD_2;ThiS-like;UAE_UbL;Ub-Mut7C;Ub-RnfH;ubiquitin;Ubiquitin_2;Ubiquitin_3;Ufm1;Urm1;

open PLANTS,"plant3_genome_gff_proteome_files.txt";


while (my $plant=<PLANTS>){


	$plant=~s/\n//g;

	next unless($plant=~/protein/);

	my @plant=split /\t/,$plant;

	my $species=$plant[2];

	# $species=~s/\_.*//g;

print "species=",$species,"\n";

	my $blast_db=$species;

	$blast_db=~s/\.fa/\_db/g;

	$blast_db="../proteome_databases/".$blast_db;

print "blast_db=",$blast_db,"\n";

	my $blastp="blastp_temp";

	system("blastp -query $family_seed -db $blast_db -evalue 1 -outfmt 6 -out $blastp -num_threads 12");


# blastp -query /home/zhihua/projects/ub_like/ubl_pfam_full_seqs/ubl_full_seq.fa -db /home/zhihua/databases/blast/db/plant51_dbs/Ugibba_protein.db -evalue 1 -outfmt 6 -out blastp_temp -num_threads 8

	my $species_tag=substr($species,0,3);

	my $count_id=0;

	my @peps=();

	my $blastp_parse_file=$species_tag."blastp_parse";

	my $pep_db=Bio::DB::Fasta->new("../proteome_databases/".$species);


	my @blastp_parse_ids=();

	open BLASTP,"<$blastp";

	while (my $parse=<BLASTP>){

		$parse=~s/\n//g;

		my @parse=split /\t/,$parse;

		my $parse_ref=\@parse;

		push(@blastp_parse_ids,$parse_ref->[1]);

				}

	close BLASTP;

	my %seen;

	my @unique = grep { ! $seen{$_}++ } @blastp_parse_ids;


print "unique_hit=",scalar @unique,"\n";

	my $count=0;


	foreach my $id (@unique ) {
 		  

######################################

		my $pep_obj=$pep_db->get_Seq_by_id($id);
		my $pep=$pep_obj->seq;

		my $header=$pep_db->header($id);

		my $pep_pfam=">".$id."\n".$pep."\n";

###

		my @pfam_scan=($id,$families,$pep_pfam, $pwd);


		my $dms=pfam_scan(@pfam_scan);

		next if($dms eq "none");

		++$count;

		# print $species,"\t",$count,"\n";
		# print $dms,"\n";

		my $count_length=length $count;
		my $count_label='';

		if($count_length eq 1){

			$count_label="000".$count;

						}

		if($count_length eq 2){

			$count_label="00".$count;

						}

		if($count_length eq 3){

			$count_label="0".$count;

						}


		my $family_id=$superfamily."_".$count_label;
	

		$pep=">".$species.$family_id." \| ".$header." \| ".$dms."\n".$pep."\n";

		push(@peps,$pep);


					}	




my $pfam_pep_file=$species."_BLASTP_pfamscan.fa";



open ANNOTATION_PEP,">$pfam_pep_file";

print ANNOTATION_PEP @peps,"\n";

close ANNOTATION_PEP;


 unlink $blastp;

		}










####################################















exit;
	

	

		



































	

	

