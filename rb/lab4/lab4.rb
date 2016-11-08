require '../math'

secret_key = [5, 12, 20, 40, 80, 160, 320, 640]

def knapsack(text, l, secret_key)
  open_key = []	
  array_b = []
  coded = []

  m = secret_key.reduce(:+) + 23
  n = find_coprime(m)

  l.times do |i|
  	open_key << (secret_key[i]*n)%m
  end

  text.split("").each do |ch|
	array_b << ch.unpack("B*")[0]
  end

  array_b.each do |ch|
  	nums = ch.split("")

    coded << open_key.select.with_index do | p, i |
      nums[i] == "1"
    end.reduce(:+)
  end
  puts "coded: #{coded.inspect}"
  puts "decoded: #{decode(coded, n, m, secret_key)}"

end

def decode(array_of_numbers, n, m, secret_key)
	text_arr = []
	array_of_numbers.each do |num|
		char_arr = []
		a = (num * invmod(n, m))%m
		7.downto(0) do | i |
			if a >= secret_key[i]
				char_arr << "1"
				a = a - secret_key[i]
			else
				char_arr << "0"
			end		
	    end
	    text_arr << char_arr.reverse.join("")
	end

	[text_arr.join("")].pack("B*")
	
end

puts "Please type your text here: "
text = gets.chomp

knapsack(text, 8, secret_key)