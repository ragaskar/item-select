class JasmineHelper
  def self.files
    #return a list of files you want to load before your spec defintions load
    ['/lib/jquery-1.3.2.js', '/lib/item-select.js']
  end

  def self.stylesheets
    #return a list of stylesheets you want to load in the runner    
    []
  end

end
