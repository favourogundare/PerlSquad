sub pfam_scan {

	my (@superfamily_pfam)=@_;

	my $id=$superfamily_pfam[0];
	my $families=$superfamily_pfam[1];
	my $pep_pfam=$superfamily_pfam[2];
	my $pwd=$superfamily_pfam[3];

	my @families=split /\#/,$families;

	print "families=",@families,"\n";

	my $temp_pfam_file=$pwd."/temp_pfam.fa";
	my $out_pfam_file=$pwd."/temp_pfam_scan_out.txt";

	open PFAM,">$temp_pfam_file";
	print PFAM $pep_pfam;
	close PFAM;

	system ("perl /usr/local/programs/perl_scripts/PfamScan/pfam_scan.pl -fasta temp_pfam.fa -dir /usr/local/databases/pfam27 -e_seq 1 -e_dom 1 -outfile $out_pfam_file");

	unlink $temp_pfam_file;

	

	open PFAM_OUT,"<$out_pfam_file";

	my @dms;

	while(my $out=<PFAM_OUT>){

		if($out=~/$id/){

			for(my $i=0; $i<10; ++$i){

				$out=~s/  / /g;

					}


			my @out=split / /, $out;

			pop@out;
			pop@out;
			pop@out;
			my $e_value=pop@out;
	
			if($e_value<1){
			
				shift@out;
				my $start=shift@out;
				my $end=shift@out;
				shift@out;
				shift@out;
				shift@out;
				my $dm=shift@out;

				$dm=$dm."\|".$e_value."\|".$start."\-".$end;

				push(@dms,$dm," \| ");

						}

					}

			}#while

	close PFAM_OUT;

	 unlink $out_pfam_file;


	my $dms=join('',@dms);

	my $family_value=0;

	my $family_number=scalar @families;

	print "family_number=",$family_number,"\n";

	for(my $j=0; $j<$family_number; ++$j){

		# $j=$j-1;

		my $family=$families[$j];


print "familiy=",$j,"\t",$family,"\n";

		if($dms=~/$family/){

			++$family_value;

					}

				}

	if($family_value==0){

		$dms="none";
			
				}


	return $dms;




}

1;















